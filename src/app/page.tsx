"use client";
import Image from "next/image";
import { Bill } from "@/types/types";
import { FormEvent } from "react";
import React from "react";
export default function Home() {
  const startDay = 10;
  const startDate = new Date();
  startDate.setDate(startDay);
  startDate.setHours(0, 0, 0, 0);

  const [spent, setSpent] = React.useState<number>(0);
  const [bills, setBills] = React.useState<Bill[]>([]);
  const [mode, setMode] = React.useState<"TOTAL" | "SPEND" | "INCOME">("TOTAL");

  React.useEffect(() => {
    let initialSum = 0;
    bills.map((bill) => (initialSum += bill.amount));
    setSpent(initialSum);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    let newBill: Bill = {
      reason: formData.get("reason"),
      amount: formData.get("amount"),
      date: new Date(),
    };

    setBills([...bills, newBill]);
    setSpent(spent + Number(newBill.amount));
    event.currentTarget.reset();
  }

  return (
    <>
      <header className="flex py-4 mx-auto items-center gap-4 text-xl">
        <Image
          src="/logoNeg.svg"
          width={36}
          height={36}
          alt="Ponferrada Enzo"
        ></Image>
        Tracker
      </header>
      <main className="m-auto flex flex-col">
        <div className="mx-auto flex py-16">
          <h2 className="text-2xl pr-6">This month:</h2>
          <span className="text-2xl">$ {spent}</span>
        </div>
        <div className="flex flex-col mb-10">
          <button
            type="button"
            className={`text-xl rounded border-sky-50 border py-4 mb-4 ${
              mode === "TOTAL"
                ? "bg-transparent"
                : mode === "SPEND"
                ? "bg-transparent"
                : "bg-green-950"
            }`}
            onClick={() => setMode(mode !== "INCOME" ? "INCOME" : "TOTAL")}
          >
            New Income
          </button>
          <button
            type="button"
            className={`text-xl rounded border-sky-50 border py-4 mb-4 ${
              mode === "TOTAL"
                ? "bg-transparent"
                : mode === "INCOME"
                ? "bg-transparent"
                : "bg-red-950"
            }`}
            onClick={() => setMode(mode !== "SPEND" ? "SPEND" : "TOTAL")}
          >
            New Spend
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          id="billForm"
          className="flex flex-col mt-10 mb-20"
        >
          <label className="text-xl mb-2" htmlFor="reason">
            Reason
          </label>
          <input
            className="focus:outline-none text-lg mb-6 bg-transparent border-b border-sky-50"
            type="text"
            name="reason"
            autoComplete="off"
          />
          <label className="text-xl mb-2" htmlFor="amount">
            Amount $
          </label>
          <input
            className="focus:outline-none text-lg mb-6 bg-transparent border-b border-sky-50"
            type="number"
            name="amount"
            required
          />
          <button
            type="submit"
            className="rounded border-sky-50 border py-4 my-4"
          >
            Submit
          </button>
        </form>
      </main>
      <footer className="min-w-full">
        <ul className="flex justify-center items-center ">
          <a
            className="border-sky-100 border w-24 h-16 text-center content-center rounded-l rounded-bl-none"
            href=""
          >
            This Week
          </a>
          <a
            className="border-sky-100 border w-24 h-16 text-center content-center "
            href=""
          >
            This year
          </a>
          <a
            className="border-sky-100 border w-24 h-16 text-center content-center rounded-r rounded-br-none"
            href=""
          >
            Export
          </a>
        </ul>
      </footer>
    </>
  );
}
