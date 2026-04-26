
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

const articles = [
  {
    title: "Understanding RO Membrane Longevity",
    category: "Technical Guide",
    date: "May 12, 2024",
    readTime: "8 min read",
    image: "resource-article",
    description: "Learn how pre-filtration impacts your reverse osmosis membrane lifespan and how to optimize maintenance schedules."
  },
  {
    title: "Desalinization: The Future of Water Security",
    category: "Industry News",
    date: "April 28, 2024",
    readTime: "12 min read",
    image: "hero-water",
    description: "How massive RO plants are transforming arid regions and the technological breakthroughs making it cost-effective."
  },
  {
    title: "Scaling Up: Industrial Water Design Patterns",
    category: "Best Practices",
    date: "March 15, 2024",
    readTime: "15 min read",
    image: "service-industrial",
    description: "A deep dive into modular vs. monolithic plant design for manufacturing facilities with varying water needs."
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Resource Library</h1>
            <p className="text-lg text-muted-foreground">
              Deepen your understanding of water treatment technology through our collection of technical guides, research papers, and industry analysis.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search resources..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Card key={i} className="flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-none group">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={PlaceHolderImages.find(img => img.id === article.image)?.imageUrl || ""}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</div>
                  <div className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {article.date}</div>
                </div>
                <CardTitle className="font-headline text-xl text-accent group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="p-0 text-primary font-bold hover:gap-2 transition-all">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Featured Case Study */}
        <div className="mt-24 p-8 md:p-12 bg-accent text-accent-foreground rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Featured Case Study</span>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Zero-Liquid Discharge System for GigaFactory X</h2>
              <p className="text-accent-foreground/70 text-lg leading-relaxed">
                Discover how we designed a closed-loop RO system that reduced water consumption by 85% for one of the world's largest automotive manufacturers.
              </p>
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                Download PDF Case Study
              </Button>
            </div>
            <div className="hidden lg:block">
              <Image
                src={PlaceHolderImages.find(i => i.id === "hero-water")?.imageUrl || ""}
                alt="Case study"
                width={500}
                height={350}
                className="rounded-2xl shadow-2xl rotate-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
