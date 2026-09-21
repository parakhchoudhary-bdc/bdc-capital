import SelectLoanType from "@/components/loanJourney/SelectLoanType";
import { allLoanJourneys, common } from "@/data/loanJourney";

export default function Page() {
  const options = allLoanJourneys.map((item) => ({
    value: item.pathname,
    label: item.title,
  }));

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10">
        <div
          style={{
            background:
              "radial-gradient(44.57% 44.57% at 44.87% 54.49%, rgba(0, 90, 69, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
            opacity: 0.6,
            filter: "blur(10px)",
          }}
          className="h-[200vh] aspect-square rounded-full absolute left-full -translate-x-full"
        />
        <div
          style={{
            background:
              "radial-gradient(44.57% 44.57% at 44.87% 54.49%, rgba(70, 194, 145, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
            opacity: 0.6,
            filter: "blur(10px)",
          }}
          className="h-[200vh] aspect-square rounded-full absolute -top-[40%] right-0 md:-right-[10%] translate-x-1/2 md:translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <SelectLoanType
        formHeading={common.selectLoanType.formHeading}
        formDescription={common.selectLoanType.formDescription}
        ctaContent={common.selectLoanType.ctaContent}
        options={options}
        form={common.selectLoanType.form}
      />
    </>
  );
}
