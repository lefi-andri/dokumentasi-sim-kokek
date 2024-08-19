import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

interface Dokumentasi {
  id: number;
  judul: string;
  no_pengurutan: number;
  is_show: string;
  is_draft: string;
  kategori_dokumentasi: {
    nama: string;
  };
  permalink: string; // {{ edit_1 }} Tambahkan properti permalink
}

const SearchPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [dokumentasi, setDokumentasi] = useState<Dokumentasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}api/dokumentasi?page=${page}`,
          {
            params: { search },
          }
        );
        setDokumentasi(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, search]
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [search, currentPage, fetchData]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-circle text-white"
        // onClick={() => {
        //   const modal = document.getElementById(
        //     "my_modal_4"
        //   ) as HTMLDialogElement; // Cast to HTMLDialogElement
        //   if (modal) modal.showModal(); // Now showModal() is recognized
        // }}
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>

            <div className="pt-8">
              <input
                className="w-full input input-bordered input-primary"
                value={search}
                placeholder="Masukkan judul dokumentasi yang akan Anda cari"
                onChange={handleSearch}
                autoFocus
              />
            </div>

            <div className="overflow-auto mt-10">
              <table className="table">
                <tbody>
                  {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          <td></td>
                        </tr>
                      ))
                    : dokumentasi.map((dt, index) => (
                        <tr key={index} className="">
                          <td className={`${montserrat.className} text-base`}>
                            <Link
                              href={`${baseUrl}reading/${dt.permalink}`}
                              onClick={closeModal}
                              className="text-gray-900 hover:text-purple-800 hover:font-bold"
                            >
                              {dt.judul}{" "}
                              <div className="text-sm text-gray-600">
                                {dt.kategori_dokumentasi.nama}
                              </div>
                            </Link>
                          </td>
                        </tr>
                      ))}

                  {loading
                    ? ""
                    : dokumentasi.length === 0 && (
                        <tr>
                          <td className="px-6 py-4 text-sm" colSpan={8}>
                            Tidak ada data.
                          </td>
                        </tr>
                      )}
                </tbody>
              </table>
            </div>
            {dokumentasi.length != 0 ? (
              <div className="flex flex-wrap mt-16">
                <button
                  className={
                    "mr-1 mb-1 px-3 py-2 text-sm leading-4 text-black-400 border rounded"
                  }
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: lastPage }, (_, index) => (
                  <button
                    className={`mr-1 mb-1 px-3 py-2 text-sm leading-4 text-black-400 border rounded ${
                      currentPage === index + 1
                        ? "focus:border-primary focus:text-primary bg-gray-700 text-white"
                        : ""
                    }`}
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className={
                    "mr-1 mb-1 px-3 py-2 text-sm leading-4 text-black-400 border rounded"
                  }
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === lastPage}
                >
                  Next
                </button>
              </div>
            ) : (
              ""
            )}

            {/* <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close Modal
              </button>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
