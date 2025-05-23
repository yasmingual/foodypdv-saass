
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
}

interface UserProfileProps {
  user: UserData;
  onLogout: () => void;
}

export const UserProfile = ({ user, onLogout }: UserProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);
  const [userData, setUserData] = React.useState(user);

  const handleSaveProfile = () => {
    // Aqui implementaríamos a atualização do perfil no backend
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          {user.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          ) : (
            <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEditing ? (
          <>
            <div className="grid gap-1">
              <Label>Email</Label>
              <div className="text-sm">{user.email}</div>
            </div>
            <div className="grid gap-1">
              <Label>Data de cadastro</Label>
              <div className="text-sm">{formatDate(user.createdAt)}</div>
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-1">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                value={userData.name} 
                onChange={(e) => setUserData({...userData, name: e.target.value})}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onLogout}>
          Sair do sistema
        </Button>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
            <Button onClick={handleSaveProfile}>Salvar</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
