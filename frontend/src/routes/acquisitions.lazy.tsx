import { createLazyFileRoute } from "@tanstack/react-router";
import Acquisitions from "../components/Acquisitions/Acquisitions";

export const Route = createLazyFileRoute("/acquisitions")({
  component: Acquisitions,
});
