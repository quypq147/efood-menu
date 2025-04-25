'use client'

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export default function FoodCard({  }) {
    return (
        <Card className="bg-[#2a2a3c] text-white hover:shadow-lg hover:bg-[#333347] transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <span>Food Name</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                <p>Food Description</p>
                <Button className="mt-4">View Details</Button>
            </CardContent>
        </Card>
    )
}