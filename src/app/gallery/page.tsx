
import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold font-headline text-primary">Installation Gallery</h1>
          <p className="text-muted-foreground">A visual showcase of our technical excellence in the field.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PlaceHolderImages.map((img, i) => (
            <Card key={i} className="overflow-hidden border-none group cursor-pointer">
              <CardContent className="p-0 relative aspect-square">
                <Image
                  src={img.imageUrl}
                  alt={img.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                  <p className="text-white text-sm font-medium">{img.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
