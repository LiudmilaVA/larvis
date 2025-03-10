import { createLazyFileRoute } from "@tanstack/react-router";
import MyProfile from "../components/MyProfile/MyProfile";

export const Route = createLazyFileRoute("/myprofile")({
  component: MyProfile,
});
