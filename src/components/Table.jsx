import TableHeader from './TableHeader';
import Row from './Row';

const SummaryTable = ({ projects }) => {
  const renderRows = () => {
    return projects.map((projectDetails, i) => {
      const [project, client, details] = projectDetails;

      return (
        <Row
          key={`${project}, ${i}`}
          project={project}
          client={client}
          details={details}
        />
      );
    });
  };

  return (
    <div>
      <table className='summary-table'>
        <TableHeader />
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
