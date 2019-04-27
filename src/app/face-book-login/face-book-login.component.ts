import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
declare var FB;
@Component({
  selector: "fb-login",
  templateUrl: "./face-book-login.component.html",
  styleUrls: ["./face-book-login.component.css"]
})
export class FaceBookLoginComponent {
  constructor(private router: Router, private zone: NgZone) {
    this.loginWithFB = () => {
      FB.login(
        response => {
          console.log(response);

          console.log(response.status);
          if (response.status === "connected") {
            this.zone.run(() => {
              this.navigateToDashBoardViaFB();
            });
          }
        },
        { scope: "public_profile,email,user_likes" }
      );
    };

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: "1326526600832223",
        cookie: true,
        xfbml: true,
        version: "v3.2"
      });

      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  loginWithFB(): any {
    console.log("in login WIth FB");

    FB.login(
      response => {
        console.log(response);

        console.log(response.status);
        if (response.status === "connected") {
          console.log("finally connected");

          console.log(response.status);
          this.router.navigate(["/userDashboard"]);
        }
      },
      { scope: "public_profile,email,user_likes" }
    );
  }

  navigateToDashBoardViaFB() {
    console.log("fb login");

    this.router.navigate(["/userDashboard"]);
  }
}
