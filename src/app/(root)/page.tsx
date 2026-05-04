import { LanyardResponse } from "react-use-lanyard";
import Home from "@/components/Home";
import api from "../../../lib/api";
import Projects from "@/components/Projects";

export default async function Page() {

  const activity = await api.get<LanyardResponse | undefined>(
    `https://api.lanyard.rest/v1/users/1357551929374408734`,
    {
      cache: false,
    }
  );

  return (
    <>
      <Home activity={activity.data} />
      <Projects />
    </>
  );
}