import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Page introuvable
            </h1>
            <p className="text-gray-600 mb-6">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Button>
            </Link>
            
            <Link href="/services">
              <Button variant="outline" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Découvrir nos services
              </Button>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Vous pouvez aussi essayer de :
            </p>
            <div className="space-y-2 text-sm">
              <Link href="/blog" className="block text-blue-600 hover:underline">
                Lire notre blog
              </Link>
              <Link href="/portfolio" className="block text-blue-600 hover:underline">
                Voir nos projets
              </Link>
              <Link href="/contact" className="block text-blue-600 hover:underline">
                Nous contacter
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 