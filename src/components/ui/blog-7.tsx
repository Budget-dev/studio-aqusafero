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
    <section className="py-24">
      <div className="container mx-auto flex flex-col items-center gap-16 px-4">
        <div className="text-center">
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 font-black tracking-widest uppercase py-1.5 px-4 text-[10px] rounded-lg bg-primary/10">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-pretty text-4xl font-black font-headline text-slate-900 md:mb-4 md:text-5xl lg:mb-6 lg:max-w-3xl lg:text-6xl tracking-tight">
            {heading}
          </h2>
          <p className="mb-8 text-slate-600 font-bold md:text-lg lg:max-w-2xl lg:text-xl">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto text-primary font-black uppercase tracking-widest text-xs" asChild>
            <a href={buttonUrl}>
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {posts.map((post) => (
            <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto] border-none bg-sky-50/30 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <CardHeader className="pt-8">
                <h3 className="text-2xl font-black font-headline text-slate-900 leading-tight group-hover:text-primary transition-colors">
                  <a href={post.url}>
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 font-bold leading-relaxed">{post.summary}</p>
              </CardContent>
              <CardFooter className="pb-8">
                <a
                  href={post.url}
                  className="flex items-center text-primary font-black uppercase tracking-widest text-xs hover:gap-2 transition-all"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
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
