import {create } from 'zustand';
import { persist } from 'zustand/middleware';

type Order = {
    id : number;
    orderCode : string;
    customerName : string;
    totalPrice : number;
    status : string;
    createdAt : Date;
    updatedAt : Date;
    orderItems : OrderItem[];
}
type OrderItem = {
    id : number;
    foodName : string;
    foodPrice : number;
    foodImage : string;
    orderId : number;
    foodId : number;
    quantity : number;
    createdAt : Date;
    updatedAt : Date;
}

