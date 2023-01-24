// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({ error, isError, ...rest }) {
  if (isError) {
    return (
      <>
        <WrappedComponent {...rest} />
        <p className="error">{error.message}</p>
      </>
    );
  }

  return <WrappedComponent {...rest} />;
};
