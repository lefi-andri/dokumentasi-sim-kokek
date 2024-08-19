import Image from "next/image";
import { Inter, Montserrat } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Dokumentasi - SIM KOKEK</title>
      </Head>
      <div className={`col-span-4 bg-white ${inter.className}`}>
        <div className="hero bg-base-200 py-10">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Halo pengguna SIM KOKEK</h1>
              <p className="py-6">
                SIM KOKEK memiliki dokumentasi penggunaan aplikasi secara
                online. Silahkan gunakan sesuai kebutuhan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="self-start sticky top-10 col-span-2 ">
        <Image
          src="/girl-surveiku.png"
          width={500}
          height={500}
          alt="SurveiKu Girl"
        />
      </div>
    </>
  );
}
