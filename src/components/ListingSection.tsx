import React from "react";

interface ListItem {
  icon: string;
  title?: string;
  description: string;
}

interface ListingSectionProps {
  heading: string;
  text: string;
  items: ListItem[];
  conclusion?: string;
  bgColor?: string;
  flexDirection?: string
  descriptionFontStyle?: string;
}

const ListingSection: React.FC<ListingSectionProps> = ({
  heading,
  text,
  items,
  conclusion,
  bgColor = "bg-white",
  flexDirection,
  descriptionFontStyle = "text-subHeading tracking-subHeading leading-[100%] font-medium",
}) => {
  return (
    <section
      className={`@container relative ${bgColor} grid grid-cols-4 gap-x-4 md:gap-x-5 gap-y-10 lg:gap-y-15 py-15 md:py-20 px-4 md:px-6 lg:px-10`}
    >
      <div className="flex flex-col gap-y-4 md:gap-y-6 col-span-4 @4xl:col-span-2">
        <h3 className="text-[28px] sm:text-heading1 tracking-heading1 leading-[100%] max-w-147.5 text-mainTitleColor font-medium text-center @4xl:text-left mx-auto @4xl:m-0">
          {heading}
        </h3>
        <p className="text-bodyBase tracking-base leading-[124%] max-w-118 text-mainTitleCopyColor text-center @4xl:text-left mx-auto @4xl:m-0">
          {text}
        </p>
      </div>
      <div className="flex flex-col col-span-4 @4xl:col-span-2">
        {items?.map((item, index) => (
          <div
            key={index}
            className={`py-6 md:py-7 lg:py-10 border-borderColor flex ${flexDirection} ${flexDirection !== "flex-col" && "items-center"} gap-6 ${index === 0 ? "border-y" : "border-b"
              }`}
          >
            <img src={item.icon} alt={item.title} className="h-8 w-8" />
            <div>
              {item.title && (
                <p className="text-bodyBase text-titleCopyColor tracking-base mb-4">
                  {item.title}
                </p>
              )}
              <p className={`${descriptionFontStyle} text-titleColor`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
        {conclusion && (
          <p className="pt-6 md:pt-7 lg:pt-10 text-bodyBase tracking-base text-titleColor leading-[124%] max-w-[80%] lg:max-w-[60%]">
            {conclusion}
          </p>
        )}
      </div>
    </section>
  );
};

export default ListingSection;
