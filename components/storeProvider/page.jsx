"use client";

import store from "@/lib/store/store";
import * as React from "react";
import { Provider } from "react-redux";

export function StoreProvider({ children, ...props }) {
  return <Provider store={store} {...props}>{children}</Provider>;
}
