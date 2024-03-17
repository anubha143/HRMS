"use client";
import React, { useReducer, createContext, useMemo } from "react";

export const Context = createContext();

function createData(type, period, req_date, reason, status, employee) {
  return { type, period, req_date, reason, status, employee };
}

export const users = [
  {
    name: "Christne Kim",
    email: "chris@hrms.com",
    role: "employee",
    dp: "employee",
  },
  {
    name: "Madison Willams",
    email: "madi@hrms.com",
    role: "manager",
    dp: "manager",
  },
  { name: "Sarah Tompson", email: "sara@hrms.com", role: "hr", dp: "hr" },
  {
    name: "Jane Doe",
    email: "john@hrms.com",
    role: "employee",
    dp: "employee1",
  },
  {
    name: "Luna James ",
    email: "jane@hrms.com",
    role: "employee",
    dp: "employee2",
  },
];

const leaves = [
  createData(
    "Sick",
    "16 Mar 2024 - 18 Mar 2024",
    "15 Mar 2024",
    "Cough",
    "pending",
    0
  ),
  createData(
    "Vacation",
    "24 Mar 2024 - 26 Mar 2024",
    "14 Mar 2024",
    "Family Trip",
    "pending",
    3
  ),
  createData(
    "Sick",
    "16 Mar 2024 - 19 Mar 2024",
    "15 Mar 2024",
    "Cold & Cough",
    "pending",
    4
  ),
  createData(
    "Vacation",
    "10 Feb 2024 - 15 Feb 2024",
    "04 Feb 2024",
    "Family Trip",
    "approved",
    0
  ),
  createData(
    "Annual",
    "1 Feb 2024 - 7 Feb 2024",
    "04 Feb 2024",
    "Trip",
    "approved",
    3
  ),
  createData(
    "Sick",
    "31 Dec 2023 - 2 Jan 2024",
    "30 Dec 2023",
    "Cough",
    "rejected",
    0
  ),
  createData(
    "Sick",
    "13 Mar 2023 - 15 Mar 2023",
    "12 Mar 2023",
    "Cough",
    "approved",
    0
  ),
  createData(
    "Vacation",
    "10 Feb 2023 - 15 Feb 2023",
    "04 Feb 2023",
    "Family Trip",
    "rejected",
    0
  ),
  createData(
    "Sick",
    "31 Dec 2022 - 2 Jan 2023",
    "30 Dec 2022",
    "Cough",
    "approved",
    0
  ),
];

const initialState = {
  leaves: leaves,
};

export const ContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    let leaves = [...state.leaves];
    switch (action.type) {
      case "add_leave":
        leaves.unshift(action.data);
        return {
          ...state,
          leaves,
        };
      case "approve_leave":
        let approve_leave = leaves[action.index];
        approve_leave.status = "approved";
        return {
          ...state,
          leaves,
        };
      case "reject_leave":
        let reject_leave = leaves[action.index];
        reject_leave.status = "rejected";
        return {
          ...state,
          leaves,
        };
      default:
        return {
          ...state,
          ...action,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
