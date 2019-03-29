import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductService } from "../../Services/product.service";
import { Product } from "../../Models/Product";
import { Router } from "@angular/router";
import { CartService } from "../../Services/cartService";
@Component({
  selector: "vendor-dashboard",
  templateUrl: "./vendor-dashboard.component.html",
  styleUrls: ["./vendor-dashboard.component.css"]
})
export class VendorDashboardComponent implements OnInit {
  products = [];
  name: String;
  price: Number;
  productId: String;
  productImage: String;
  showCreateProductform: Boolean = false;
  showEditForm: Boolean = false;
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {}

  getAllProducts() {
    this.products = [];
    console.log("in get all products");

    this.showCreateProductform = false;
    this.productService.getProducts().subscribe(response => {
      this.products = response.products;
      console.log("logging in getAllproducts");

      console.log(this.products);
      JSON.stringify(this.products);
    });
  }

  onclickCreateProduct() {
    this.showCreateProductform = true;
  }
  createProduct() {
    let newProduct = new Product();
    newProduct.name = this.name;
    newProduct.price = this.price;
    newProduct.productImage = this.productImage;

    this.productService.createProduct(newProduct).subscribe(res => {
      console.log(res);
    });
    setTimeout(() => {
      this.getAllProducts();
    }, 1000);

    this.showCreateProductform = false;
  }

  deleteProduct(_id) {
    let index = this.products.forEach(x => {
      if (x._id == _id) {
        console.log(x);

        this.products.splice(this.products.indexOf(x), 1);
        return;
      } else {
        console.log("not found");
      }
    });

    this.productService.deleteProduct(_id).subscribe(res => {
      console.log(res);
    });
  }

  showUpdateProductForm(product) {
    this.showEditForm = true;
    this.price = product.price;
    this.name = product.name;
    this.productId = product._id;
  }

  updateProduct(name: String, price: Number, productId: String) {
    console.log("in update ");

    this.productService.updateProduct(name, price, productId).subscribe(err => {
      console.log(err);
    });

    delete this.products;
    console.log("products after clearing");
    this.showEditForm = false;

    setTimeout(() => {
      this.getAllProducts();
    }, 50);
    console.log(this.products);
  }

  navigateToPayments() {
    this.router.navigate(["app-payments"]);
  }
}
