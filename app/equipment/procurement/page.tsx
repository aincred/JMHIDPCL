"use client";

export default function EquipmentProcurementPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
        The Equipment Procurement Process
      </h1>

      <div className="space-y-8 text-gray-800 leading-relaxed text-justify">
        {/* Objectives */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Objectives for Equipment Procurement
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              To procure modern era optimum quality Equipment at competitive
              rates and to follow transparent procedures.
            </li>
            <li>
              To meet the Equipment, Purchase and Maintenance requirements of
              different Healthcare Institutions.
            </li>
            <li>
              To follow quality parameters for diagnosis, technology and
              research to provide best healthcare services in Jharkhand.
            </li>
            <li>
              To meet these objectives, JMHIDPCL has incorporated few
              transformations in its scope of work.
            </li>
          </ul>
        </section>

        {/* Procurement Method */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Procurement Method
          </h2>
          <p className="mb-3">
            JMHIDPCL floats tenders through <b>e-tendering process</b>, on
            receiving indent by the various departments through{" "}
            <b>Jharkhand tender online services</b>.
          </p>
          <p className="mb-3">
            In addition to e-tendering, JMHIDPCL also does additional
            advertising of tenders to the market leaders across the country and
            <b> All India Manufacturers Association</b>.
          </p>
          <p>
            The general specifications for all the Equipment are decided by
            various <b>Medical experts</b> so as to allow maximum vendor
            participation in the tendering process.
          </p>
        </section>

        {/* Pre-bid & Technical Scrutiny */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Pre-bid & Technical Scrutiny
          </h2>
          <p className="mb-3">
            A <b>pre-bid meeting</b> is organized for single quantity of
            Equipment worth <b>Rs. 50 lacs and more</b> or if the total tender
            value is <b>Rs. 1 crore and more</b>.
          </p>
          <p>
            Primary and technical scrutiny is carried out, following the tender
            terms and conditions, finalized by JMHIDPCL. A{" "}
            <b>demonstration session</b> is also conducted by JMHIDPCL at the
            time of Technical Scrutiny to see the live specification of the
            equipment & check its functioning.
          </p>
        </section>

        {/* Financial Evaluation */}
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Financial Evaluation & Finalization
          </h2>
          <p className="mb-3">
            After technical scrutiny, <b>Commercial bid</b> is opened by the
            competent authority, assessing the financial aspects of the Tender.
          </p>
          <p>
            Once the vendor is finalized, <b>acceptance of Tender</b> and{" "}
            <b>acceptance letter</b> is issued and a{" "}
            <b>purchase order</b> is placed to supply the indented equipment to
            the consignee.
          </p>
        </section>
      </div>
    </main>
  );
}
