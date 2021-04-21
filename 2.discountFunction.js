let DumbWaysJos = 'DumbWaysJos';
let DumbWaysMantap = 'DumbWaysMantap';

function countingDiscount(discountType, purchase){
    let finalPrice, discount;
    if (discountType == 'DumbWaysJos' && purchase >= 50000){
        discount = (purchase*211/1000)
       if (discount >= 20000){
           discount = 20000;
       }
       finalPrice = purchase - discount;
    } else if(discountType == 'DumbWaysMantap' && purchase >= 80000){
        discount = (purchase*30/100)
        console.log(discount)
       if (discount >= 40000){
           discount = 40000;
       }
       finalPrice = purchase - discount;
    } else {
       finalPrice = purchase;
    }
   return finalPrice;
}

console.log(countingDiscount(DumbWaysJos, 100000));
