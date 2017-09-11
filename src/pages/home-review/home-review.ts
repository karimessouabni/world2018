import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { AddReviewPage } from '../add-review/add-review' ;
import { ReviewsProvider } from '../../providers/reviews/reviews';

/**
 * Generated class for the HomeReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-review',
  templateUrl: 'home-review.html',
})
export class HomeReviewPage {

  reviews: any;

  constructor(public nav: NavController, public reviewService: ReviewsProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() { // charger tous les avis au chargement de la page 
    console.log('ionViewDidLoad HomeReviewPage');
    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });
  }

  addReview(){
    
       let modal = this.modalCtrl.create(AddReviewPage);
    
       modal.onDidDismiss(review => {
         if(review){
           this.reviews.push(review);
           this.reviewService.createReview(review);        
         }
       });
    
       modal.present();
    
     }


     deleteReview(review){
      
         //Remove locally
           let index = this.reviews.indexOf(review);
      
           if(index > -1){
             this.reviews.splice(index, 1);
           }   
      
         //Remove from database
         this.reviewService.deleteReview(review._id);
       }
       



}


