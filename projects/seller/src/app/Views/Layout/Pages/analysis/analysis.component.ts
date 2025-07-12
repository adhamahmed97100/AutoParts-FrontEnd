import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [RouterModule, NgxChartsModule, CommonModule, NgClass],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
})
export class AnalysisComponent {
  // بيانات الإيرادات الشهرية (واقعية لبداية مشروع)
  revenueData = [
    { name: 'Jan', value: 500 },
    { name: 'Feb', value: 700 },
    { name: 'Mar', value: 900 },
    { name: 'Apr', value: 1200 },
    { name: 'May', value: 1000 },
    { name: 'Jun', value: 2000 },
    { name: 'Jul', value: 1800 },
    { name: 'Aug', value: 1500 },
    { name: 'Sep', value: 3000 },
    { name: 'Oct', value: 4000 },
    { name: 'Nov', value: 5500 },
    { name: 'Dec', value: 6000 },
  ];

  // المنتجات الأكثر مبيعاً (كميات بسيطة ومنطقية)
  revenueDataCar = [
    { name: '02228 AMiO Turbo sound Exhaust tip', value: 15 },
    { name: 'ABAKUS 231-02-038 Brake pad set', value: 20 },
    { name: 'VI0063 ET ENGINETEAM Inlet valve', value: 12 },
    { name: 'VALEO 044645 Rear light', value: 8 },
    { name: 'ABAKUS Intercooler', value: 5 },
  ];

  // طرق الدفع (واقعية في مصر، موقع لسه جديد)
  paymentMethodsData = [
    { name: 'Cash on Delivery', value: 55 },
    { name: 'Vodafone Cash', value: 25 },
    { name: 'Visa/MC', value: 15 },
    { name: 'PayPal', value: 5 },
  ];

  // حالة الطلبات (نسبة كبيرة لسه Pending)
  orderStatus = [
    { name: 'Pending', value: 40 },
    { name: 'Confirmed', value: 20 },
    { name: 'Shipped', value: 15 },
    { name: 'Delivered', value: 20 },
    { name: 'Cancelled', value: 5 },
  ];

  // مبيعات حسب المناطق في الإسكندرية (منتشرة باعتدال)
  salesByLocation = [
    { name: 'Smouha', value: 600 },
    { name: 'San Stefano', value: 500 },
    { name: 'El Shatby', value: 450 },
    { name: 'Moharram Bek', value: 350 },
    { name: 'Maamoura', value: 300 },
    { name: 'Miami', value: 650 },
    { name: 'Bakos', value: 250 },
    { name: 'Gleem', value: 400 },
    { name: 'Montaza', value: 300 },
    { name: 'Asafra', value: 200 },
    { name: 'Misr Station', value: 350 },
    { name: 'ALagmi', value: 100 },
  ];

  // إحصائيات سريعة (أرقام متناسقة مع الباقي)
  quickStats = [
    {
      label: 'Total Revenue',
      value: 'EGP 31,000',
      icon: 'fa-dollar-sign',
      color: '#4e73df',
    },
    {
      label: 'Orders',
      value: '180',
      icon: 'fa-shopping-cart',
      color: '#1cc88a',
    },
    { label: 'Customers', value: '95', icon: 'fa-users', color: '#36b9cc' },
    { label: 'Products', value: '42', icon: 'fa-tag', color: '#f6c23e' },
  ];
  // تحديد لوحة الألوان
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#4e73df', // أزرق فاتح
      '#1cc88a', // أخضر
      '#36b9cc', // سماوي
      '#f6c23e', // أصفر
      '#e74a3b', // أحمر
      '#5a5c69', // رمادي
      '#6f42c1', // أرجواني
      '#fd7e14', // برتقالي
      '#20c9a6', // فيروزي
    ],
  };

  // خيارات مشتركة للرسوم البيانية
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  legendPosition = 'below';
  showLabels = true;
  animations = true;
  barPadding = 8;
  roundEdges = true;
  legendTitle = '';

  // متغير لتحديد الوضع (إضاءة أو ليلي)
  isDarkMode = false;

  constructor() {
    // عند تحميل الصفحة، استرجاع قيمة الوضع من localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'true';
      this.applyTheme();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  private applyTheme() {
    // تطبيق الوضع على عنصر الـ body للتأثير على كامل الصفحة
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
