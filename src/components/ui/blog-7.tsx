
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog7Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: Post[];
}

const Blog7 = ({
  tagline,
  heading,
  description,
  buttonText,
  buttonUrl,
  posts,
}: Blog7Props) => {
  return (
    <section className="py-12 md:py-24 bg-transparent">
      <div className="container mx-auto flex flex-col items-center gap-8 md:gap-16 px-4">
        <div className="text-center">
          <Badge variant="outline" className="mb-4 md:mb-6 text-primary border-primary/30 font-black tracking-widest uppercase py-1 px-3 md:py-1.5 md:px-4 text-[8px] md:text-[10px] rounded-lg bg-primary/10 max-md:bg-primary/20 max-md:backdrop-blur-sm">
            {tagline}
          </Badge>
          <h2 className="mb-2 text-pretty text-2xl font-black font-headline text-slate-900 max-md:text-white md:mb-4 md:text-5xl lg:mb-6 lg:max-w-3xl lg:text-6xl tracking-tight uppercase">
            {heading}
          </h2>
          <p className="mb-6 md:mb-8 text-slate-600 max-md:text-slate-300 font-bold text-sm md:text-lg lg:max-w-2xl lg:text-xl">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto text-primary font-black uppercase tracking-widest text-[10px] md:text-xs" asChild>
            <a href={buttonUrl}>
              {buttonText}
              <ArrowRight className="ml-2 size-3 md:size-4" />
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col border-none bg-sky-50/30 max-md:bg-white/5 max-md:backdrop-blur-md max-md:border-white/10 rounded-xl md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group h-full">
              <div className="aspect-[4/3] w-full overflow-hidden relative shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <CardHeader className="p-6 md:p-8 flex-1">
                <h3 className="text-lg md:text-2xl font-black font-headline text-slate-900 max-md:text-white leading-tight group-hover:text-primary transition-colors uppercase">
                  <a href={post.url}>
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
              <CardContent className="p-8 pt-0 hidden md:block">
                <p className="text-slate-600 max-md:text-slate-400 font-bold leading-relaxed text-sm">{post.summary}</p>
              </CardContent>
              <CardFooter className="p-6 md:p-8 md:pb-8 mt-auto">
                <a
                  href={post.url}
                  className="flex items-center text-primary font-black uppercase tracking-widest text-[10px] md:text-xs hover:gap-2 transition-all"
                >
                  <span className="hidden md:inline">Read more</span>
                  <span className="md:hidden">Details</span>
                  <ArrowRight className="ml-1 md:ml-2 size-2 md:size-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
