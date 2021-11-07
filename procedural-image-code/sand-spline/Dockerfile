FROM public.ecr.aws/lambda/python:3.8

ADD /fast-sand-paint /fast-sand-paint
ADD /fn /fn

WORKDIR /app

COPY requirements.txt  .

# RUN pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"
RUN pip3 install --no-cache-dir Cython
RUN pip3 install --no-cache-dir numpy
RUN pip3 install --no-cache-dir scipy
RUN pip3 install --no-cache-dir pillow

RUN yum -y install python3-dev \
                        gcc \
                        libc-dev
RUN yum -y install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel
RUN yum install git -y

RUN pip3 install -e ../fast-sand-paint/
RUN pip3 install -e ../fn/

# Copy function code
COPY app.py ${LAMBDA_TASK_ROOT}
ADD /modules ${LAMBDA_TASK_ROOT}/modules
ADD /img /app/img
ADD /res /app/res

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]
