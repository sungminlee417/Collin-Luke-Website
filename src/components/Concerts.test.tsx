import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Concerts from "./Concerts";

const renderComponent = () => {
  const concerts = [
    {
      startDate: {
        day: 1,
        month: "May",
      },
      endDate: {
        day: 2,
        month: "May",
      },
      venue: "Place",
      time: "7:00PM PDT",
      location: "Place St.",
      ticketUrl: "www.ticketurl.com",
    },
    {
      startDate: {
        day: 3,
        month: "May",
      },
      endDate: {
        day: 4,
        month: "May",
      },
      venue: "Place Two",
      time: "8:00PM PDT",
      location: "Place Two St.",
      moreInfoUrl: "www.moreinfourl.com",
    },
  ];

  render(<Concerts concerts={concerts} />);

  return { concerts };
};

test("shows correct number of concerts", () => {
  const { concerts } = renderComponent();

  expect(concerts).toHaveLength(2);
});

test("all concert info is visible", () => {
  const { concerts } = renderComponent();

  for (const concert of concerts) {
    const date = screen.getByText(
      new RegExp(`${concert.startDate.day}-${concert.endDate.day}`)
    );
    const venue = screen.getByText(concert.venue);
    const time = screen.getByText(concert.time);
    const location = screen.getByText(concert.location);

    // expect(date);
    expect(venue).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    if (concert.ticketUrl) {
      const ticketUrl = screen.getByRole("link", { name: /tickets/i });
      expect(ticketUrl).toBeInTheDocument();
      expect(ticketUrl).toHaveAttribute("href", "www.ticketurl.com");
    }
    if (concert.moreInfoUrl) {
      const moreInfoUrl = screen.getByRole("link", { name: /more info/i });
      expect(moreInfoUrl).toBeInTheDocument();
      expect(moreInfoUrl).toHaveAttribute("href", "www.moreinfourl.com");
    }
  }
});
