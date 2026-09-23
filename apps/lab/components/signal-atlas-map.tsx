type SignalMapProps = {
  label?: string;
  decorative?: boolean;
  idPrefix?: string;
};

/** A fictional network, not a map of any real city or live service. */
export function SignalMap({ label = "Illustrative city network with highlighted corridors", decorative = false, idPrefix = "sa-explorer" }: SignalMapProps) {
  return <svg className="saMapArt" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet" role={decorative ? undefined : "img"} aria-label={decorative ? undefined : label} aria-hidden={decorative ? true : undefined}>
    <defs>
      <pattern id={`${idPrefix}-dots`} width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="currentColor" opacity=".3" /></pattern>
    </defs>
    <rect width="1000" height="700" fill={`url(#${idPrefix}-dots)`} opacity=".32" />
    <path className="saMapCoast" d="M-10 558 120 522 194 558 315 521 423 590 510 550 637 602 744 570 866 627 1010 602V710H-10Z" />
    <path className="saMapGrid" d="M35 110H940M35 210H940M35 310H940M35 410H940M35 510H940M120 60V610M260 60V610M400 60V610M540 60V610M680 60V610M820 60V610" />
    <g className="saMapDistricts">
      <path d="M95 130 265 92 347 208 187 258Z" />
      <path d="M376 87 591 118 623 267 440 272Z" />
      <path d="M676 94 870 124 919 290 738 277Z" />
      <path d="M183 307 361 281 435 465 258 486Z" />
      <path d="M510 340 684 304 736 480 562 520Z" />
      <path d="M788 341 941 322 964 530 831 543Z" />
    </g>
    <g className="saMapBaseRoutes">
      <path d="M85 545 205 482 312 511 412 431 544 453 636 342 828 279 946 343" />
      <path d="M150 172 294 246 412 194 535 258 690 181 823 216" />
      <path d="M102 388 250 329 399 351 538 317 657 433 816 394 943 438" />
      <path d="M313 511 294 246M535 258 544 453M690 181 636 342M816 394 828 279" />
    </g>
    <g className="saMapRoute saMapRoute--mobility">
      <path d="M85 545 205 482 312 511 412 431 544 453 636 342 828 279" />
      <circle cx="205" cy="482" r="7" /><circle cx="412" cy="431" r="7" /><circle cx="636" cy="342" r="7" /><circle cx="828" cy="279" r="9" />
    </g>
    <g className="saMapRoute saMapRoute--energy">
      <path d="M150 172 294 246 412 194 535 258 690 181 823 216" />
      <circle cx="150" cy="172" r="7" /><circle cx="412" cy="194" r="7" /><circle cx="535" cy="258" r="9" /><circle cx="823" cy="216" r="7" />
    </g>
    <g className="saMapRoute saMapRoute--weather">
      <path d="M102 388 250 329 399 351 538 317 657 433 816 394 943 438" />
      <circle cx="250" cy="329" r="7" /><circle cx="538" cy="317" r="9" /><circle cx="657" cy="433" r="7" /><circle cx="943" cy="438" r="7" />
    </g>
    <g className="saMapNodes"><rect x="405" y="424" width="14" height="14" /><rect x="629" y="335" width="14" height="14" /><rect x="528" y="251" width="14" height="14" /><rect x="531" y="310" width="14" height="14" /></g>
    <g className="saMapLabels"><text x="85" y="94">WEST FIELD</text><text x="760" y="94">RIDGE EAST</text><text x="115" y="630">HARBOR EDGE</text><text x="630" y="650">SOUTH CORRIDOR</text><text x="408" y="408">C-04</text><text x="842" y="260">E-11</text></g>
    <path className="saMapFrame" d="M26 68V26H68M932 26h42v42M26 632v42h42M932 674h42v-42" />
  </svg>;
}
