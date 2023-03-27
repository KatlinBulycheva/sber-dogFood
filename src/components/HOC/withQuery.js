import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({
  isLoading, isError, error, refetch, ...rest
}) {
  if (isError) {
    return (
      <p>Произошла ошибка: {error.message}
        <Button
          onClick={refetch}
          type="button"
        >
          Попробовать еще
        </Button>
      </p>
    );
  }
  if (isLoading) return <Loader />;

  return <WrappedComponent {...rest} />;
};
