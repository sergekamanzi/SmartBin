import React from "react";
import projectImage from "../../assets/chooseus-1.png";
const features = [
  {
    name: "Reliable Service",
    description:
      "We guarantee prompt waste collection and recycling services to keep your environment clean and organized.",
  },
  {
    name: "Environmentally Friendly",
    description:
      "Our eco-friendly practices prioritize waste reduction and sustainability, ensuring a greener future for generations to come.",
  },
  {
    name: "Customer Satisfaction",
    description:
      "We prioritize your needs and ensure quick responses to inquiries, aiming for your complete satisfaction with our service.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#fff] py-12 flex gap-5 mx-20">
      <div>
        <img src={projectImage} alt="" />
      </div>
      <div className=" mx-auto  px-4">
        <h1 className="text-[#37af65] text-left text-2xl font-bold ">
          Why choose us{" "}
        </h1>
        <h1 className="sm:text-3xl lg:text-5xl font-bold title-font text-blue mb-20">
          Why choose Smart <span className="font-normal">Bin</span>{" "}
          <span className="text-[#37af65] text-5xl -ml-2">.</span>
        </h1>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20  lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none  lg:">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-2xl font-bold leading-7 text-gray-900">
                  <div className="absolute left-0 top-2 flex h-5 w-5 items-center  justify-center rounded-lg bg-[#37af65]"></div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-lg leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
