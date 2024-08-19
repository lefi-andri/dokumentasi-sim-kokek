import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// import Image from "next/image";
import { Inter, Montserrat } from "next/font/google";
import YoutubeEmbed from "../../components/YoutubeEmbed";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
  parameter: number;
}) {
  const api = process.env.NEXT_PUBLIC_API_URL;

  // console.log(params.slug[1]);

  const res = await fetch(`${api}api/reading/${params.slug[0]}`);

  const response = await res.json();

  // Jika data tidak ditemukan
  if (response.data === null) {
    return {
      notFound: true, // Menampilkan halaman 404
      // or
      // redirect: {
      //   destination: '/some-other-page',
      //   permanent: false, // Atau true, tergantung keperluan
      // },
    };
  }

  return { props: { konten: response.data } };
}
const ReadingPermalinkPage = ({ konten }: { konten: any }) => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <>
      <Head>
        <title>{konten.judul}</title>
      </Head>
      <div className={`col-span-4 bg-white ${inter.className}`}>
        {/* {konten.image ? (
          <figure className="mb-16">
            <Image
              src={`${api}storage/dokumentasi/${konten.image}`}
              className="aspect-video rounded-xl bg-gray-50 object-cover"
              width={1200}
              height={600}
              alt={konten.judul}
            />
          </figure>
        ) : (
          <></>
        )} */}
        <h3 className="text-2xl font-bold">{konten.judul}</h3>
        <article className="prose mt-10">
          <div
            className={``}
            dangerouslySetInnerHTML={{ __html: konten.konten }}
          ></div>
        </article>
        <div>
          {konten.youtube_embed_id ? (
            <>
              <YoutubeEmbed embedId={konten.youtube_embed_id} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="self-start sticky top-10 col-span-2 ">
        {konten.tag ? (
          <>
            <h3 className={`text-xl font-bold mb-10 ${inter.className}`}>
              Di halaman ini
            </h3>
            <article className="prose mt-10">
              <div
                className={``}
                dangerouslySetInnerHTML={{ __html: konten.tag }}
              ></div>
            </article>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ReadingPermalinkPage;
