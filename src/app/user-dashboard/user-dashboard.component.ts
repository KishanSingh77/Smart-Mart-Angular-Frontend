import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "../../Services/product.service";
import { Product } from "../../Models/Product";
import { Router } from "@angular/router";
import { CartService } from "../../Services/cartService";

@Component({
  selector: "userDashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"]
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  products = [];
  name: String;
  price: Number;
  productId: String;

  showCreateProductform: Boolean = false;

  public itemsInCart: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    console.log("destroying user compoenent");
    console.log(this.itemsInCart);
    this.cartService.itemsInCart = this.itemsInCart;
    console.log("end of user component");
  }

  getAllProducts() {
    this.products = [];
    console.log("in get all products");

    this.productService.getProducts().subscribe(response => {
      this.products = response.products;
      console.log("logging in getAllproducts");

      console.log(this.products);
      JSON.stringify(this.products);
    });
  }

  addItemToCart(product) {
    this.itemsInCart.push(product);
    console.log(this.itemsInCart);

    let cartCount = this.itemsInCart.length;
    alert(` ${product.name} is added to cart... ${cartCount} items in cart`);
  }

  navigateToPayments() {
    this.router.navigate(["app-payments"]);
  }
}
