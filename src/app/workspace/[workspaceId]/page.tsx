interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  return <div>id: {params.workspaceId}</div>;
};

export default WorkspaceIdPage;
