import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Inter, Montserrat } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const Menu = () => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [products, setProducts] = useState<any[]>([]);
  const [layanans, setLayanans] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch(`${api}api/get-product-menu`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setProducts(result.data);
    };

    fetchProductData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });

    const fetchLayananData = async () => {
      const response = await fetch(`${api}api/get-layanan-menu`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setLayanans(result.data);
    };

    fetchLayananData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });

    const fetchData = async () => {
      const response = await fetch(`${api}api/get-documentation-menu`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.data);
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  const [produkId, setProdukId] = useState("");
  const [filterCategory, setFilterCategory] = useState<
    { id: string; permalink: string; nama: string }[]
  >([]);
  const [filterCategoryData, setFilterCategoryData] = useState<
    { id: string; permalink: string; judul: string }[]
  >([]);
  const [categories, setCategories] = useState<
    { id: string; permalink: string; nama: string; layanan_id: string }[]
  >([]);
  const handleCategoryMenu = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hasilFilter = categories.filter(
      (item) => item.layanan_id == e.target.value
    );
    const hasilFilterCategory = data.filter(
      (item) => item.kategori_dokumentasi_id == e.target.value
    );

    setFilterCategory(hasilFilter);
    setFilterCategoryData(hasilFilterCategory);

    // console.log(filterCategory);
  };

  const fetchDivisionCategory = async () => {
    try {
      const category = await fetch(`${api}api/get-documentation-category-menu`);
      const rs = await category.json();
      setCategories(await rs.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDivisionCategory();
  }, [produkId]);

  // console.log(products);
  // console.log(categories);

  const enableArrow = ["/"];

  const renderSub = (props: any) => {
    const hasilFilterCategory = data.filter(
      (item) => item.kategori_dokumentasi_id == props
    );

    return (
      <>
        <div>
          {hasilFilterCategory.map((doc, index) => (
            <div key={index} className={`py-2 ml-5 text-sm ${inter.className}`}>
              <Link href={`${baseUrl}reading/${doc.permalink}`}>
                {doc.judul}
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  };

  const { pathname } = useRouter();

  return (
    <>
      {/* <div>
        {products && products.length > 0 ? (
          <select
            name="produkId"
            className="select select-ghost w-full"
            onChange={(e) => handleCategoryMenu(e)}
          >
            <option disabled selected>
              Pilih Produk SurveiKu
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nama}
              </option>
            ))}
          </select>
        ) : (
          <>
            <div className="skeleton h-32 w-full"></div>
          </>
        )}
      </div> */}
      {/* <SearchPage /> */}
      <div className="">
        {layanans && layanans.length > 0 ? (
          <>
            {enableArrow.includes(pathname) && (
              <Image
                src="/arrow.png"
                width={100}
                height={100}
                alt="SurveiKu Girl"
              />
            )}

            <select
              className={`select select-ghost w-full font-bold ${inter.className} bg-purple-900 text-white hover:text-white focus:text-white mt-5`}
              onChange={(e) => handleCategoryMenu(e)}
            >
              <option disabled selected>
                Pilih Divisi
              </option>
              {layanans.map((layanan) => (
                <option
                  key={layanan.id}
                  value={layanan.id}
                  className="text-white"
                >
                  {layanan.judul}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <div className="skeleton h-32 w-full"></div>
          </>
        )}
      </div>
      {filterCategory && filterCategory.length > 0 ? (
        <div className="mt-14">
          {filterCategory.map((category) => (
            <>
              <div
                key={category.id}
                className={`font-bold text-sm ${inter.className}`}
              >
                {category.nama}
              </div>
              <div>{renderSub(category.id)}</div>
            </>
          ))}
        </div>
      ) : (
        <></>
      )}
      {/* {filterCategoryData && filterCategoryData.length > 0 ? (
        <div className="mt-14">
          {filterCategoryData.map((todo) => (
            <div key={todo.id} className="py-2">
              <Link href={`${baseUrl}reading/${todo.permalink}`}>
                {todo.judul}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )} */}
    </>
  );
};

export default Menu;
