import BackButton from "@/components/BackButton";
import IncidentsTable from "@/components/incidents/IncidentsTable";

const IncidentsPage = () => {
  return (
    <div>
      <BackButton text="Back" link="/" />
      <IncidentsTable />
    </div>
  );
};

export default IncidentsPage;
