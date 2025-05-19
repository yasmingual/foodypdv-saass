
import React from "react";
import { Order } from "@/context/OrderContext";
import { useProducts } from "@/context/ProductContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image } from "lucide-react";

interface OrderItemsProps {
  order: Order;
}

const OrderItems: React.FC<OrderItemsProps> = ({ order }) => {
  const { products } = useProducts();

  // Função para buscar o preço e a imagem do item nos produtos
  const getProductDetails = (itemName: string) => {
    const product = products.find(product => product.name === itemName);
    const price = product?.price || 0;
    const imageUrl = product?.imageUrl || "";
    return { price, imageUrl };
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Itens do pedido</h3>
      <div className="text-sm max-h-[20vh] overflow-y-auto pr-2">
        {order.items.map((item, index) => {
          const { price, imageUrl } = getProductDetails(item.name);
          
          return (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={imageUrl} alt={item.name} />
                  <AvatarFallback className="bg-muted">
                    <Image className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div>{item.quantity}x {item.name}</div>
                  {item.notes && <div className="text-xs text-muted-foreground">{item.notes}</div>}
                </div>
              </div>
              <span className="font-medium">R$ {(price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItems;
