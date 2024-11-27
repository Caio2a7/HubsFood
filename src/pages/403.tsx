const GenericErrorPage = ({ statusCode }: { statusCode: number }) => {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#FFDED5] text-center p-6">
        <h1 className="text-6xl font-bold text-[#FF3700]">{statusCode}</h1>
        <p className="text-xl text-[#FF9B80] mt-4">Algo deu errado. Por favor, tente novamente mais tarde.</p>
      </div>
    );
  };
  
  export default GenericErrorPage;
  