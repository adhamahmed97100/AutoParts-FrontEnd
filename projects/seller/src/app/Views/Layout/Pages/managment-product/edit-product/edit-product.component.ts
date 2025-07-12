import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModuleModule } from '../../../../../../../../user/src/app/Shared/Modules/shared-module.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { GetCategoryModel } from '../../../../../Services/Category/Queries/Models/GetCategoryModel';
import { GetCarBrandModel } from '../../../../../Services/Car/Queries/Models/GetCarBrandModel';
import { GetModelWithBrand } from '../../../../../Services/Models/Quereis/Models/GetModelWithBrand';
import { modelCompatibilityDtos } from '../../../../../Core/Dtos/modelCompatibilityDtos';
import { Routing } from '../../../../../Meta/Routing';
import { ModelQuereisService } from '../../../../../Services/Models/Quereis/Handler/model-quereis.service';
import { CategoryQuereisService } from '../../../../../Services/Category/Queries/Handler/category-quereis.service';
import { CarBrandQueriesService } from '../../../../../Services/Car/Queries/Handler/car-brand-queries.service';
import { CompatibilityCommendService } from '../../../../../Services/Compatibility/Commend/Handler/compatibility-commend.service';
import { NavigationService } from '../../../../../Services/Navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { ProductCommendService } from '../../../../../Services/Product/Commend/Handler/product-commend.service';
import { AddProductModel } from '../../../../../Services/Product/Commend/Models/AddProductModel';
import { UpdateProductModel } from '../../../../../Services/Product/Commend/Models/UpdateProductModel';
import { GetSellerProductsModel } from '../../../../../Services/Product/Queries/Models/GetSellerProductsModel';
import { GetProductReviowsModel } from '../../../../../Services/Product/Queries/Models/GetProductReviowsModel';
import { ProductQuereisService } from '../../../../../Services/Product/Queries/Handler/product-quereis.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsRatesComponent } from './products-rates/products-rates.component';
import { ActivatedRoute } from '@angular/router';
import { GetSellerProductByidModel } from '../../../../../Services/Product/Queries/Models/GetSellerProductByidModel';

@Component({
  selector: 'app-edit-product',
  standalone: true, // Add standalone: true if you're using standalone components
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormSharedModule,
    MatDatepickerModule,
    QuillModule,
    ProductsRatesComponent,
    NgxPaginationModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  //#region  Fialds
  @Input() product: GetSellerProductByidModel | null = null;
  reviews: GetProductReviowsModel[] = [];
  productForm: FormGroup = new FormGroup({});
  originalFormValues: any = {};
  isDragOver = false;
  isDragOverMain = false;
  updateMain = false;
  filter: any = {};
  Ip: string = Routing.Ip;
  IsUpdateCategory = false;
  @Output() close = new EventEmitter<void>();
  imagePreviews = [] as { id: string; image: string }[];
  MainImagePreviews = { id: '', image: '' };
  oldImages = [] as { id: string; image: string }[];
  RemoveImagesIds = [] as string[];
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'], // التنسيقات الأساسية
      [{ list: 'ordered' }, { list: 'bullet' }], // القوائم
      ['link'], // الروابط
    ],
  };
  categories: Array<GetCategoryModel> = [];
  selectedCategory: any = null;
  selectedSubCategory: any = null;
  subcategories: any[] = [];
  images: File[] = [];
  MainImage: File = new File([], '');
  pageSize = 5; // عدد العناصر في كل صفحة
  p = 1; // الصفحة الحالية
  total: number = 0; // إجمالي عدد العناصر
  //#endregion

  //#region Injects
  private categoryService = inject(CategoryQuereisService);
  private Toster = inject(ToastrService);
  private fb = inject(FormBuilder);
  private _ProductCommendService = inject(ProductCommendService);
  private _ProductQueriesService = inject(ProductQuereisService);
  private _Router = inject(ActivatedRoute);
  //#endregion

  //#region LiveHooks
  ngOnInit(): void {
    this._Router.data.subscribe(({ ProductId }) => {
      this.product = ProductId;
    });
    this.productForm = this.InitiForm();
    this.originalFormValues = { ...this.productForm.value };
    this.addMediaFromUrl();
    this.GetReviews();
  }
  //#endregion

  //#region Methods

  GetReviews() {
    if (!this.product?.id) return;
    this.filter['ProductId'] = this.product?.id;
    return this._ProductQueriesService
      .getSellerProductReviews(this.p, this.pageSize, this.filter)
      .subscribe((res) => {
        this.reviews = res.data;
        this.total = res.totalCount;
      });
  }
  IsUpdate(): boolean {
    return (
      JSON.stringify(this.productForm.value) ===
        JSON.stringify(this.originalFormValues) &&
      this.selectedCategory == null &&
      this.selectedSubCategory == null &&
      this.MainImage.size == 0 &&
      this.images.length === 0 &&
      this.RemoveImagesIds.length === 0
    );
  }

  InitiForm(): FormGroup {
    return this.fb.group({
      // Product Information
      name: [this.product?.name || '', Validators.required],
      description: [this.product?.descreption || '', Validators.required],
      basePrice: [this.product?.price || '', Validators.required],
      discountedPrice: [''],
      inStock: [true],
      Stock: [this.product?.stock || '', Validators.required],
    });
  }
  UpdateProduct() {
    if (this.productForm.valid) {
      if (this.product?.id) {
        var requst: UpdateProductModel = {
          Id: this.product.id,
          CategoryID: this.selectedSubCategory?.id ?? '',
          Description: this.productForm.value.description,
          MainImages: this.MainImage,
          FormImages: this.images,
          IdIamgesDelteted: this.RemoveImagesIds,
          Name: this.productForm.value.name,
          Price: this.productForm.value.basePrice,
          SellerID: localStorage.getItem('sellerID') ?? '',
          StockQuantity: +this.productForm.value.Stock,
        };
        this._ProductCommendService.UpdateProduct(requst).subscribe((res) => {
          if (res.success) {
            this.Toster.success(res.message);
            this.close.emit();
          }
        });
      }
    }
  }
  //#endregion

  //#region Upload Image

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  // عند مغادرة الملف لمنطقة الإسقاط
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  // عند إسقاط الملفات
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  // عند اختيار ملفات عبر المتصفح
  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.processFiles(target.files);
    }
  }

  // معالجة الملفات وعرض المعاينة
  processFiles(files: FileList) {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files.');
        return;
      }
      this.images.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviews.push({
          image: e.target?.result as string,
          id: crypto.randomUUID(),
        });
      };
      reader.readAsDataURL(file);
    });
  }

  onDragOverMain(event: DragEvent) {
    event.preventDefault();
    this.isDragOverMain = true;
  }

  // عند مغادرة الملف لمنطقة الإسقاط
  onDragLeaveMain(event: DragEvent) {
    event.preventDefault();
    this.isDragOverMain = false;
  }

  // عند إسقاط الملفات
  onDropMain(event: DragEvent) {
    event.preventDefault();
    this.isDragOverMain = false;
    if (event.dataTransfer?.files.length) {
      this.processFilesMain(event.dataTransfer.files);
    }
  }

  // عند اختيار ملفات عبر المتصفح
  onFileSelectMain(event: Event) {
    const target = event.target as HTMLInputElement;
    this.updateMain = true;
    if (target.files) {
      this.processFilesMain(target.files);
    }
  }

  // معالجة الملفات وعرض المعاينة
  processFilesMain(files: FileList) {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files.');
        return;
      }
      this.MainImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.MainImagePreviews = {
          image: e.target?.result as string,
          id: crypto.randomUUID(),
        };
      };
      reader.readAsDataURL(file);
    });
  }

  browseImageMain() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput.click();
  }

  // فتح نافذة اختيار الملفات
  browseImage() {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fileInput.click();
  }

  // إضافة صورة من رابط
  addMediaFromUrl() {
    if (
      !this.product?.productImagesDto ||
      this.product?.productImagesDto.length === 0
    ) {
      console.warn('لا توجد صور متاحة للعرض.');
      return;
    }

    console.log('Images:', this.product?.productImagesDto);

    this.product?.productImagesDto.forEach((x: any) => {
      if (x.image.startsWith('main_')) {
        this.MainImagePreviews = {
          image: `${this.Ip}/Images/${x.image}`,
          id: x.id,
        };
      } else {
        this.imagePreviews.push({
          id: x.id,
          image: `${this.Ip}/Images/${x.image}`,
        }); // تأكد من المسار الصحيح
      }
    });
    this.product?.productImagesDto.forEach((x: any) => {
      this.oldImages.push({
        id: x.id,
        image: `${this.Ip}/Images/${x.image}`,
      }); // تأكد من المسار الصحيح
    });
  }

  // حذف صورة معينة
  removeImage(image: string, index: number) {
    var Removeimage = this.oldImages.find((x) => x.image == image);
    if (Removeimage) {
      this.RemoveImagesIds.push(Removeimage.id);
    }
    this.imagePreviews = this.imagePreviews.filter(
      (img) => img.image !== image
    );
    this.images.splice(index, 1);
  }

  removeMain() {
    this.RemoveImagesIds.push(this.MainImagePreviews.id);
    this.MainImagePreviews = { image: '', id: '' };
    this.MainImage = new File([], '');
  }
  BackWord() {
    this.close.emit();
  }
  updateCategory() {
    this.IsUpdateCategory = !this.IsUpdateCategory;
  }
  //#endregion

  pageChanged(event: number) {
    this.p = event;
    this.GetReviews();
  }
}
