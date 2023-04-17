import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it('renders without crashing', function(){
  render(<Carousel></Carousel>);
})

it('matches snapshot',function(){
  const {asFragment} = render(<Carousel></Carousel>)
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it('works when you click on the left arrow', function(){
  const { getByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  fireEvent.click(rightArrow);

  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

it('hides and shows the arrows correctly', function(){
  const { getByTestId } = render(<Carousel></Carousel>);
  const rightArrow = getByTestId("right-arrow");
  const leftArrow = getByTestId("left-arrow");

  expect(rightArrow).not.toHaveClass("hidden");
  expect(leftArrow).toHaveClass("hidden");

  fireEvent.click(getByTestId("right-arrow"));
  expect(rightArrow).not.toHaveClass("hidden");
  expect(leftArrow).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);
  expect(rightArrow).toHaveClass("hidden");
  expect(leftArrow).not.toHaveClass("hidden");
})