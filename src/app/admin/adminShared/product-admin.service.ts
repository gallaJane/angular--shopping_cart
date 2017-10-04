import { Injectable } from '@angular/core'; // Injectable provides the decorator we need for service
import * as firebase from 'firebase';
import { Product } from '../adminShared/product';


@Injectable()

export class ProductAdminService {

    //createPost method

    createProduct(prod: Product) {
        
        let storageRef = firebase.storage().ref(); //we create the reference to our storage. storage where we will store our images or audio
        storageRef.child(`product_images/${prod.imgTitle}`).putString(prod.img, 'base64') // then we use our reference with the child method. this allows us to reference a child location in our storage. we use putstring method against the actual image. base64->this is base64 formated image
            .then((snapshot) => { // since the putString is promised based, next we will chained then method to handle the returned snapshot. We need this since the image will exist outside our database, and we need the way to include it to our blogpost
                let url = snapshot.metadata.downloadURLs[0]; // then we use snapshot to grab the downloadUrl from the metadata
                let dbRef = firebase.database().ref('products/');
                let newProd = dbRef.push(); // then we use the reference with the push method. Push will append the data to a list as well as generating a unique key to every item added to a list.
                newProd.set ({ //the we use set method against the push method. 
                    name: prod.name,
                    desc: prod.description,
                    imgTitle: prod.imgTitle,
                    img: url,
                    price: prod.price,
                    id: newProd.key
                });
            })

            .catch((error) => {
                alert(`failed upload: ${error}`);
            });
    }


  editProduct(update: Product){
        let dbRef = firebase.database().ref('products/').child(update.id)
            .update({
                name: update.name,
                desc: update.description,
                price: update.price
            });
        alert('product updated');       
    }

    removeProduct(deleteProduct: Product) {
        let dbRef = firebase.database().ref('products/').child(deleteProduct.id).remove();
        alert('product deleted');
        let imageRef = firebase.storage().ref().child(`product_images/${deleteProduct.imgTitle}`)
            .delete()
                .then(function() {
                    alert(`${deleteProduct.imgTitle} was deleted from Storage`);
                }).catch(function(error) {
                    alert(`Error - Unable to delete ${deleteProduct.img}`);
                });
    }
}