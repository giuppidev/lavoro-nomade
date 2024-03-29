import { PostPreview } from "components/post-preview";
import { InferGetStaticPropsType } from "next";
import Hero from "../components/home/hero";
import Map from "../components/home/map";
import Newsletter from "../components/home/newletter";
import Steps from "../components/home/steps";
import { getBlogData } from "../utils/blog";

function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Hero />
      <Map />
      <Steps />
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Ultimi articoli del Blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              libero labore natus atque, ducimus sed.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post) => (
              <PostPreview
                author={post.author}
                post={post.frontMatter}
                key={post.frontMatter.title}
              />
            ))}
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}

export async function getStaticProps() {
  const posts = getBlogData()
    .filter((p) => {
      return p.frontMatter._raw.sourceFilePath.startsWith("blog");
    })
    .filter((_, idx) => idx < 9);

  return {
    props: { posts },
  };
}

export default Home;
