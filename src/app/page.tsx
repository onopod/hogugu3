"use client"
import { useState } from "react";
import AppBar from './components/AppBar';
import Card from './components/Card';
import Pagination from "./components/Pagination";
import SearchDialog from "./components/SearchDialog";


export default function Home() {
  const [therapists, setTherapists] = useState(["A", "B", "c", "D", "E", "F", "G"])
  return (
    <>
      <AppBar />
      <div className="items-center justify-items-center min-h-screen p-8">
        <main className="flex flex-col gap-8">
          <SearchDialog />
          {therapists.map((post, idx) => (
            <Card key={idx} />
          )
          )}
          <Pagination />
        </main >
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          footer
        </footer>
      </div >
    </>
  );
}
