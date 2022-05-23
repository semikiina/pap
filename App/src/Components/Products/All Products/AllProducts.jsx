import React, { useState } from 'react'

const AllProducts = () => {

    
    const [order, setOrder] = useState(1);
    
    const [filter, setFilter] =useState("");

    const SortProducts = (e)=>{
        
        var newSort = [...products];
        //Low to High
        if(e.target.value==1){
            setOrder(1);
            newSort.sort(function(a, b) {
                return new Date(a.date_created) - new Date(b.date_created);
            });
            setProducts(newSort);
        }
        //Low to High
        if(e.target.value==2){
            setOrder(2);
            newSort.sort(function(a, b) {
            return a.price - b.price;
            });
            setProducts(newSort);
        }
            
        //High to Low
        if(e.target.value==3){
            setOrder(3);
            newSort.sort(function(a, b) {
            return b.price - a.price;
            });
            setProducts(newSort);
        }

        //New Arrivals
        if(e.target.value==4){
            setOrder(4);
            newSort.sort(function(a, b) {
            return new Date(b.date_created) - new Date(a.date_created);
            });
            setProducts(newSort);
        }
            
    }


    const filteredProducts = products.filter((product)=> {
        return Object.keys(product).some(key =>
            product[key].toString().toLowerCase().includes(filter)
            )
    })

  return (
    <div>
      
    </div>
  )
}

export default AllProducts
