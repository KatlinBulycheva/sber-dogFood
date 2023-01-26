import { Loader } from "../Loader/Loader";

// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({
  isLoading, isError, error, refetch, ...rest
}) {
  if (isError) {
    return (
      <p>Произошла ошибка: {error.message}
        <button
          onClick={refetch}
          type="button"
        >
          Попробовать еще
        </button>
      </p>
    );
  }
  if (isLoading) return <Loader />;

  return <WrappedComponent {...rest} />;
};
