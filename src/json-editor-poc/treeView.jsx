import * as React from "react";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
// import "./styles.css";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: -16, // Adjust this value to position the line correctly
      width: 16,
      height: 1,
      borderBottom: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    cursor: "pointer", // Add cursor pointer to indicate clickable
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    order: 2, // Move the icon container to the right
  },
  [`& .${treeItemClasses.label}`]: {
    order: 1, // Keep the label on the left
    flexGrow: 1,
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ExpandIcon(props) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(props) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(props) {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

export default function BorderedTreeView({ handleItemClick }) {
  return (
    <div className="border-solid border-2 border-[#DDDDDD] rounded-[5px] w-max p-[10px] h-[638px]">
      <SimpleTreeView
        aria-label="customized"
        defaultExpandedItems={["1", "3"]}
        slots={{
          expandIcon: ExpandIcon,
          collapseIcon: CollapseIcon,
          endIcon: EndIcon,
        }}
        sx={{
          overflowX: "hidden",
          minHeight: 270,
          flexGrow: 1,
          width: "max-content",
          // maxWidth: 300,
        }}
      >
        <CustomTreeItem
          itemId="1"
          label="SKU - UG6598UG6598"
          onClick={(event) => handleItemClick(event, 1)}
        >
          <CustomTreeItem itemId="11" label="Frame Assembly" />
          <CustomTreeItem itemId="12" label="Electrical Components">
            <CustomTreeItem itemId="121" label="Electric Motor" />
            <CustomTreeItem itemId="122" label="Battery Pack" />
          </CustomTreeItem>
        </CustomTreeItem>
        <CustomTreeItem
          itemId="2"
          label="SKU - UG3424165346"
          onClick={(event) => handleItemClick(event, 2)}
        >
          <CustomTreeItem itemId="21" label="Frame Assembly">
            <CustomTreeItem itemId="211" label="Frame" />
            <CustomTreeItem itemId="212" label="Suspension Fork" />
          </CustomTreeItem>
        </CustomTreeItem>
        <CustomTreeItem
          itemId="3"
          label="SKU - UG3424109876"
          onClick={(event) => handleItemClick(event, 3)}
        >
          <CustomTreeItem itemId="31" label="Powertrain" />
          <CustomTreeItem itemId="32" label="Chassis and Body" />
          <CustomTreeItem itemId="33" label="Suspension and Steering" />
        </CustomTreeItem>
        <CustomTreeItem
          itemId="4"
          label="SKU - UG3424156783"
          onClick={(event) => handleItemClick(event, 4)}
        >
          <CustomTreeItem itemId="41" label="Powertrain" />
          <CustomTreeItem itemId="42" label="Chassis and Body" />
          <CustomTreeItem itemId="43" label="Suspension and Steering" />
        </CustomTreeItem>
      </SimpleTreeView>
    </div>
  );
}
