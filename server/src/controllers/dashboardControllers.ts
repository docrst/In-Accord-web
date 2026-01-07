import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"; 

const prisma = new PrismaClient();

export const getDashboardStats = async (
    req: Request,
     res: Response
    ): Promise<void> => {
    try {
        const popularProducts = await prisma.products.findMany({
            take: 15,
           orderBy: {
            stockQuantity: "desc"
           }, 
        });
        const saleSummary = await prisma.salesSummary.findMany({
            take: 5,
           orderBy: {
            date: "desc",
           },
        });
        const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
           orderBy: {
            date: "desc",
           },
        });
        const expensesSummary = await prisma.expensesSummary.findMany({
            take: 5,
           orderBy: {
            date: "desc",
           },
        });
        const expensesByCategorySummaryRaw = await prisma.expensesByCategory.findMany({
            take: 5,
           orderBy: {
            date: "desc",
           },
        });
        const expensesByCategorySummary = expensesByCategorySummaryRaw.map(item => ({
            ...item,
            amount: item.amount.toString()
        }));

        
    } catch (error) {
     res.status(500).json({ message: "Error retrieving dashboard metrics" });
    } 
};

