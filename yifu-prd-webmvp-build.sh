#!/bin/bash

BRANCH_ARRAY=('dev' 'master')
FILENAME="yifu-prd-webmvp:1.0.0"
NAMESPACE_ARRAY=('qas-mvp' 'prd-mvp')
ENV_ARRAY=('qas' 'prd')
WEB_DEPLOY_DIR="./deploy/prd/k8s-yaml/"

Color_Text()
{
  echo -e " \e[0;$2m$1\e[0m"
}

Echo_Red()
{
  echo $(Color_Text "$1" "31")
}

Echo_Green()
{
  echo $(Color_Text "$1" "32")
}

Echo_Yellow()
{
  echo $(Color_Text "$1" "33")
}

rtp_branch_selection()
{
    if [ -z "${BRANCH_SELECT}" ]; then
        BRANCH_SELECT="0"
        Echo_Yellow "请选择你要更新推送的环境"
        echo "1: 更新推送 ${BRANCH_ARRAY[0]} 分支代码"
        echo "2: 更新推送 ${BRANCH_ARRAY[1]} 分支代码"
        echo "0: 不更新"
        read -p "请输入你的选择 (1, 2 or 0): " BRANCH_SELECT
    fi

    case "${BRANCH_SELECT}" in
    1)
        Echo_Green "即将更新 ${BRANCH_ARRAY[0]}"
        rtp_update
        ;;
    2)
        Echo_Green "即将更新 ${BRANCH_ARRAY[1]} 服务"
        rtp_update
        ;;
    0)
        Echo_Green "不更新任何服务"
        ;;
    *)
        Echo_Green "未输入，或输入错误"
        Echo_Green "不更新任何服务"
    esac
}

rtp_update(){
	NOW_BRANCH=$(git branch | sed -n '/\* /s///p')
	Echo_Red "    +---------------------------------------------------------------------------+"
	Echo_Red "    +-----                         当前分支为： ${NOW_BRANCH}                    -----+"
	Echo_Red "    +---------------------------------------------------------------------------+"
	Echo_Red "    "

	if [ "${NOW_BRANCH}" != "${BRANCH_ARRAY[${BRANCH_SELECT}-1]}" ]; then
	  Echo_Red "    +-----                         目标分支为： ${BRANCH_ARRAY[${BRANCH_SELECT}-1]}                    -----+"
	  Echo_Red "    +-----                    当前分支与目标分支不一致，即将切换                -----+"
		git checkout ${BRANCH_ARRAY[${BRANCH_SELECT}-1]}
		Echo_Red "    +-----                    分支切换完成，当前分支为： $(git branch | sed -n '/\* /s///p')              -----+"
	fi

	Echo_Red "    +-----          ${BRANCH_ARRAY[${BRANCH_SELECT}-1]}即将开始拉取远程代码              -----+"
	git pull origin ${BRANCH_ARRAY[${BRANCH_SELECT}-1]}
	Echo_Red "    +-----          ${BRANCH_ARRAY[${BRANCH_SELECT}-1]}分支代码拉取完毕              -----+"
	Echo_Red "    +-----          ${BRANCH_ARRAY[${BRANCH_SELECT}-1]}分支代码即将开始编译              -----+"

	docker rmi -f ${FILENAME}
	docker rmi -f hub.worfu.com/${NAMESPACE_ARRAY[${BRANCH_SELECT}-1]}/${FILENAME}

	docker build -f ./deploy/${ENV_ARRAY[${BRANCH_SELECT}-1]}/Dockerfile -t hub.worfu.com/${NAMESPACE_ARRAY[${BRANCH_SELECT}-1]}/${FILENAME} .
	docker images | grep ${FILENAME[${BRANCH_SELECT}-1]}
	docker tag ${FILENAME} hub.worfu.com/${NAMESPACE_ARRAY[${BRANCH_SELECT}-1]}/${FILENAME}
	docker push hub.worfu.com/${NAMESPACE_ARRAY[${BRANCH_SELECT}-1]}/${FILENAME}
}

rtp_branch_selection

#cd ${WEB_DEPLOY_DIR}
#kubectl delete -f prd-yifu-app-mvp-webmvp-deployment.yaml
#kubectl create -f prd-yifu-app-mvp-webmvp-deployment.yaml
#kubectl get pods -n prd-mvp -w
