import Button from "@/components/common/Button";

export default function Test() {
  return (
    <>
      <p>공통버튼 size, color prop으로 받을 수 있도록 구현해놓았습니다. </p>
      <br />
      <p>
        보시고 원하시는 프롭을 받아서 해당페이지에서 사용하시면 될 것 같아요.
      </p>
      <br />
      <p>
        margin, padding 등등 custom해야하는 것들은 밑에 보이시는 것처럼
        addClassName으로 받으셔서 작성하시면 됩니다.
      </p>
      <br />
      <p>
        disabled는 옵셔널로 받게 해놓았으니 필요하시면 받아서 사용하시면 될 것
        같습니다.
      </p>
      <Button type="button" size="large" color="primary">
        로그인
      </Button>
      <br />
      <Button type="button" size="large" color="white">
        회원가입
      </Button>
      <br />
      <Button type="button" size="medium" color="primary">
        회원가입
      </Button>
      <br />
      <Button type="button" size="medium" color="white">
        로그인
      </Button>
      <br />
      <Button type="button" size="small" color="primary">
        회원가입
      </Button>
      <br />
      <Button type="button" size="small" color="white">
        로그인
      </Button>
    </>
  );
}
