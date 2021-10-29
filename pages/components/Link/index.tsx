import LinkStyle from "./Link.module.css";

export default function Link({
  links,
}: {
  links: MH.C.LinkProps;
}): JSX.Element {
  const lks: Array<MH.C.Link> = [];
  return (
    <div className={LinkStyle["link-main"]}>
      {lks.concat(links).map((e) => {
        return (
          <a key={e.link} href={e.link}>
            {e.name}
          </a>
        );
      })}
    </div>
  );
}
