"use client"
import { useEffect, useState } from "react";
import AppBar from './components/AppBar';
import Card from './components/Card';
import Pagination from "./components/Pagination";
import SearchDialog from "./components/SearchDialog";
import BottomBar from "./components/BottomBar";
import { Skeleton } from "@mui/material";

export default function Home() {
  const [therapists, setTherapists] = useState(false)
  useEffect(() => {
    setTherapists(["A", "B", "c", "D", "E", "F", "G"]);
  }, [])
  return (
    <>
      <AppBar />
      <div className="items-center justify-items-center min-h-screen p-8">
        <main className="flex flex-col gap-8">
          {(therapists ? (
            <>
              <SearchDialog />
              {therapists.map((post, idx) => (
                <Card key={idx} />
              )
              )}
              <Pagination />
            </>
          ) : (
            <>
              <Skeleton />
            </>
          ))}
        </main >
      </div >
      <BottomBar />
    </>
  );
}
