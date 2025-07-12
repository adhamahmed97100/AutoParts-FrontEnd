import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  brands = [
    { name: 'Mobil', logo: 'Brands/1.png' },
    { name: 'Mann Filter', logo: 'Brands/2.png' },
    { name: 'Brembo', logo: 'Brands/3.png' },
    { name: 'Moje Auto', logo: 'Brands/4.png' },
    { name: 'Romix', logo: 'Brands/5.png' },
  ];

  features = [
    {
      icon: 'thumb_up',
      title: 'TOP PRICES',
      description:
        'Auto Parts Egypt guarantees high-quality car parts at very attractive prices.',
    },
    {
      icon: 'local_shipping',
      title: 'SHIPPING COSTS',
      description:
        'Free shipping within the EG on purchases of over EGP 130 except when ordering bulky items, core parts, or tyres.',
    },
    {
      icon: 'payment',
      title: 'OUR PAYMENT METHODS',
      description:
        'We accept PayPal, Visa, Discover, American Express, and bank transfer.',
    },
    {
      icon: 'category',
      title: 'WIDE CHOICE',
      description:
        'Our product range currently includes over 2,500,000 car parts.',
    },
  ];

  fastFeatures = [
    { description: 'huge numbers of items in stock at any given moment;' },
    { description: 'intuitive website layout;' },
    { description: 'quick order processing;' },
    { description: 'rapid delivery via DHL, GLS, or UPS;' },
    { description: 'warehouse facilities at the heart of Europe.' },
  ];
}
