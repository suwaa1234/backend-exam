import { Request, Response, NextFunction } from "express";
import { createClothes, getProductById, getSellerById, listClothes, updateClothes, deleteClothes } from "../services/Clothes.service";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await listClothes();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, size } = req.body;
    const { user } = req as any;

    if (!name || !price || !size) {
      return res.status(400).json({ message: "Мэдээлэл дутуу байна" });
    }
    if(user.role !== 'seller'){

    }
    const seller = await getSellerById(user.id);

    if (!seller || seller.role !== 'SELLER') {
      return res.status(403).json({ message: "Seller эрхтэй байх хэрэгтэй" });
    }

    const clothes = await createClothes({
      name,
      description,
      price: parseFloat(price),
      size,
      sellerId: user.id
    });

    res.status(201).json({ success: true, data: clothes });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, price, size } = req.body;
    const { user } = req as any;

    const existingClothes = await getProductById(Number(id));

    if (!existingClothes) {
      return res.status(404).json({ message: "Хувцас олдсонгүй" });
    }

    if (existingClothes.sellerId !== user.id) {
      return res.status(403).json({ message: "Та зөвхөн өөрийн үүсгэсэн барааны мэдээлэлийг шинэчилэх боломжтой" });
    }

    const updatedClothes = await updateClothes(Number(id), {
      name,
      description,
      price: price ? parseFloat(price) : undefined,
      size
    });

    res.json({ success: true, data: updatedClothes });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { user } = req as any;

    const existingClothes = await getProductById(Number(id));

    if (!existingClothes) {
      return res.status(404).json({ message: "Ийм хувцас олдсонгүй!" });
    }

    if (existingClothes.sellerId !== user.id) {
      return res.status(403).json({ message: "Та зөвхөн өөрийн үүсгэсэн барааны мэдээлэлийг устгах боломжтой" });
    }

    await deleteClothes(Number(id));

    res.json({ success: true, message: "Хувцас устгагдлаа" });
  } catch (error) {
    next(error);
  }
};