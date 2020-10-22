import BaseLayout from '@/layouts/BaseLayout';
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";

const Secret = withAuth(() => {
  return (
    <BaseLayout page="Secret">
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">SECRET</h1>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
});

export default withApollo(Secret);
