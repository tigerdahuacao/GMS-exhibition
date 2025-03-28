import { Checkbox, Chip, FormControlLabel, FormGroup } from "@mui/material";
import CircleCheckMark from "../../components/svgIcon/CircleCheckMark";
// import DoneIcon from '@material-ui/icons/Done';

export default function TodoList() {
    const DIV_CLASS =
        "border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1";
    const NOTE_CLASS = " ml-8 pr-2 mb-1";
    return (
        <div>
            <FormGroup>
                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="拖拽式侧边栏"
                    />
                </div>

                <div className={DIV_CLASS}>
                    {/* [2023-10-08 修改"Left right 背景图拿掉] */}
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="Left right 背景图拿掉"
                    />
                    <div className="ml-8 pr-2 mb-1">
                        <Chip
                            variant="outlined"
                            size="small"
                            color="primary"
                            label="把2个卡片中间不留空隙比较困难, 暂时未修改, 在css的海洋中迷失了"
                        />
                    </div>
                </div>

                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="user信息缩小, 放进一个页面 "
                    />
                </div>

                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="radio box点击的更改方式 "
                    ></FormControlLabel>
                    <div className="ml-8 pr-2 mb-1 ">
                        <Chip
                            variant="outlined"
                            size="small"
                            color="primary"
                            label="按钮点击之间有0.8s的延迟防止重复点击"
                            // deleteIcon={<CircleCheckMark />}
                            // deleteIcon={<DoneIcon />}
                        />

                        <Chip
                            variant="outlined"
                            size="small"
                            color="primary"
                            label="可以给radio button区域添加遮罩, 延迟反馈 但比较困难"
                        />
                    </div>
                </div>
                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="BCDB 一定要下拉式的"
                    />
                    <div className={NOTE_CLASS}>
                        <Chip
                            // variant="outlined"
                            // size="small"
                            color="secondary"
                            label="BCDC的预填中不能带有shipping option, 添加了toggle来展示这个功能"
                        />
                    </div>
                </div>

                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="Todo list变成checkbox "
                    />
                </div>
                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="APM拿掉, 变成一个新的tab"
                    />
                </div>
                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="侧边栏小窗口时隐藏"
                    />
                </div>
                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="PayPal等添加logo"
                    />
                </div>

                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="dashboard为参数提供自定义toggle"
                    />
                </div>

                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="user信息可修改 -- 使用redux实现"
                    />
                    <div className={NOTE_CLASS}>
                        <Chip
                            variant="outlined"
                            // size="small"
                            color="primary"
                            label="user信息已经放到reducer中"
                        />
                    </div>
                </div>

                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="PP按钮的点击事件变成OrderV2"
                    />
                </div>

                <div className={DIV_CLASS}>
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="评估OrderV2 API的调用是否要从Fetch改成Axois"
                    />
                </div>
            </FormGroup>
        </div>
    );
}
